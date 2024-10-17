import Text "mo:base/Text";
import Principal "mo:base/Principal";

actor {
    public query func greet(name : Text : Text) : async Text {
        return "Hello, " # name # "!";
    };

    public shared (msg) func whoami() : async Principal {
        msg.caller
    };
};
