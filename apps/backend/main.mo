import Text "mo:base/Text";

actor {
    public query func greet(name : Text : Text) : async Text {
        return "Hello, " # name # "!";
    };
};
