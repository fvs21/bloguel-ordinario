import { Post as P, Comment as C } from "./models.js";

export type Post = InstanceType<typeof P>;
export type Comment = InstanceType<typeof C>;