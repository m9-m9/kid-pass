type MessageType = "NAV" | "FUNC";

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage(message: string): void;
    };
  }
}

interface Message {
  type: MessageType;
  data?: Record<string, unknown>;
}

const sendToRn = (message: Message): void => {
  //
  if (window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify(message));
  } else {
    console.log("ReactNativeWebView is not available");
  }
};

export default sendToRn;
