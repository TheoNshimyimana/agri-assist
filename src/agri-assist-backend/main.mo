import LLM "mo:llm";
import Debug "mo:base/Debug";

actor ChatbotBackend {
  let system_prompt : Text = "You are an AI assistant.";

  public shared func chat(prompt: Text) : async Text {
    Debug.print("Received prompt: " # prompt);

    let response = await LLM.chat(#Llama3_1_8B, [
      { role = #system_; content = system_prompt },
      { role = #user; content = prompt }
    ]);

    Debug.print("AI Response: " # response);  

    return response;
  };
}
