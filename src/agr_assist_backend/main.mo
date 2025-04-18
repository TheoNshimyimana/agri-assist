import Debug "mo:base/Debug";

actor Chatbot {
    let system_prompt : Text = "You are a helpful assistant.";  // System prompt
    var conversation_history : [Text] = [];  // Stores the conversation

    // Function to handle chat
    public shared func chat(prompt: Text) : async Text {
        Debug.print("Received prompt: " # prompt);

        // Add the user input to the conversation history
        conversation_history := conversation_history # [prompt];

        // Combine system_prompt with the entire conversation history
        let full_prompt = system_prompt # "\n" # concat(conversation_history, "\n");

        // Call a simulated AI function to generate the response
        let response : Text = await someAIChatFunction(full_prompt);

        Debug.print("AI Response: " # response);

        // Add the AI response to the conversation history
        conversation_history := conversation_history # [response];

        return response;
    };

    // Placeholder function simulating AI chat
    public func someAIChatFunction(full_prompt: Text) : async Text {
        // Simulate response generation using the full conversation history
        return "Simulated AI response for: " # full_prompt;
    };

    // Utility to concatenate conversation history into a single string
    public func concat(history: [Text], separator: Text) : Text {
        var result : Text = "";
        for (message in history) {
            result := result # message # separator;
        };
        return result;
    };
};
