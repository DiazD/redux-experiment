import { createSelector } from "../../utils";

export const canDeleteUserSelector = createSelector(["ui", "usersList", "canDelete"]);
