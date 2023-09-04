export type messageType = "user-connect" | "user-message" | "user-leave";

export type usersMap = Map<string, NodeJS.Timeout | null>;
