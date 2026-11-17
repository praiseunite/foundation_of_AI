"""Shared classroom runner: offline by default, real API only with --live.

This helper supplies the client so the teaching files can focus on the request.
Its stand-in uses explicit scripts and keywords. It is not an AI model.
"""

import argparse
import getpass
import os
import re
import sys
from types import SimpleNamespace

DEFAULT_MODEL = "gpt-6-astra"  # Official quickstart example checked 8 Nov 2026.
RETIRED_MODELS = {"gpt-3.5-turbo", "gpt-3.5-turbo-0125",
                  "gpt-4-turbo-preview", "gpt-4-0125-preview"}


class OfflineClient:
    """A small scripted stand-in with the method name used by the real SDK."""

    def __init__(self):
        self.responses = self
        self.saved = {}
        self.counter = 0

    def create(self, *, model, input, instructions="", store=False,
               previous_response_id=None, **options):
        if model in RETIRED_MODELS:
            raise ValueError("The chosen historical model ID is retired.")
        messages = [{"role": "user", "content": input}] if isinstance(input, str) else list(input)
        if previous_response_id is not None:
            if previous_response_id not in self.saved:
                raise ValueError("No stored offline response has that ID.")
            messages = self.saved[previous_response_id] + messages
        last = next((m["content"] for m in reversed(messages) if m["role"] == "user"), "")

        if "return exactly one label" in instructions.lower():
            # Simple keyword rules make this stand-in's limitations visible.
            topic = "SAFETY" if re.search(r"safety|training", last, re.I) else (
                "HOURS" if re.search(r"when|time|open|close|hours", last, re.I) else (
                    "BOOKING" if re.search(r"book|reserve|slot", last, re.I) else "UNKNOWN"))
            text = topic
        elif "greet me by name" in last.lower():
            name = None
            for message in messages:
                if message["role"] == "user":
                    match = re.fullmatch(r"My name is (.+)\.", message["content"])
                    if match:
                        name = match.group(1)
            text = "Hello, " + name + "!" if name else "What name would you like me to use?"
        elif re.fullmatch(r"My name is (.+)\.", last):
            text = "Thanks. I will use that name in this conversation."
        elif "variable" in last.lower():
            text = "A variable is a name your program uses to store and find a value."
        elif "api" in last.lower():
            text = "An API lets one program request a service from another program."
        else:
            text = "This offline stand-in has no scripted answer for that input."

        self.counter += 1
        response_id = "offline_response_" + str(self.counter)
        if store:
            self.saved[response_id] = messages + [{"role": "assistant", "content": text}]
        return SimpleNamespace(id=response_id, status="completed", output_text=text, usage=None)


def prepare(description):
    """Read command options, then construct an offline or real client."""
    parser = argparse.ArgumentParser(description=description)
    parser.add_argument("--live", action="store_true",
                        help="Make the stated real API requests; usage may incur charges.")
    parser.add_argument("--model", default=os.environ.get("OPENAI_MODEL", DEFAULT_MODEL),
                        help="Model ID accessible to your API project; default is the docs example.")
    args = parser.parse_args()
    if args.model in RETIRED_MODELS:
        parser.error("This course model ID is retired. Choose a current accessible model.")
    if not args.live:
        print("OFFLINE MODE: scripted stand-in; no network call, SDK, or API key required.")
        return OfflineClient(), args.model

    try:
        from openai import OpenAI
    except ImportError:
        raise SystemExit("Install openai in this Python environment before using --live.")

    key = os.environ.get("OPENAI_API_KEY", "").strip()
    if not key:
        if not sys.stdin.isatty():
            raise SystemExit("Live mode needs a private OPENAI_API_KEY or a terminal for hidden entry.")
        key = getpass.getpass("API key (hidden, not saved): ").strip()
    if not key:
        raise SystemExit("No key entered. Run without --live to practise offline.")
    print("LIVE MODE: real model requests; model output may vary. Model:", args.model)
    # No SDK retries in this introductory exercise: one call remains one attempt.
    return OpenAI(api_key=key, timeout=30.0, max_retries=0), args.model


def request(client, model, *, instructions, input, store=False, previous_response_id=None):
    """Make one bounded request, report useful failures, and inspect completion.

    Never print credentials, raw error bodies, or the full request on an error.
    """
    options = {
        "model": model,
        "instructions": instructions,
        "input": input,
        "store": store,
        "max_output_tokens": 512,
    }
    if model in {"gpt-6-astra", "gpt-6-sol"}:
        options["reasoning"] = {"effort": "low"}
    if previous_response_id is not None:
        options["previous_response_id"] = previous_response_id
    try:
        response = client.responses.create(**options)
    except Exception as error:
        explanations = {
            "AuthenticationError": "Check your private API key and project.",
            "PermissionDeniedError": "Check project permissions and model access.",
            "NotFoundError": "Check the exact model ID, retirement status, and account access.",
            "RateLimitError": "Check whether the limit concerns request rate or usage allowance.",
            "APIConnectionError": "Check network connectivity.",
            "APITimeoutError": "The request timed out. Check connectivity before retrying.",
            "BadRequestError": "Check the supported fields and values for the chosen model.",
        }
        hint = explanations.get(type(error).__name__, "Inspect configuration and official API guidance.")
        raise SystemExit("Request failed. " + hint) from None
    if response.status != "completed":
        raise SystemExit("Response is not completed. Inspect status, limits, and incomplete details.")
    if not response.output_text:
        raise SystemExit("No text output. Inspect refusals, output items, or the output token bound.")
    return response
