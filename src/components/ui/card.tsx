import { clx } from "@/libs/utils/clx/clx-merge";

export const Card = clx.div("rounded-xl border bg-card text-card-foreground shadow p-6");
export const CardHeader = clx.div("flex flex-col space-y-1.5 ");
export const CardNav = clx.div("flex flex-col space-y-1.5 ");
export const CardTitle = clx.h3("text-2xl font-semibold leading-none tracking-tight");
export const CardContent = clx.div("pt-4");
export const CardFooter = clx.div("flex items-center pt-0");
export const CardText = clx.p("text-muted-foreground");
export const CardDescription = clx.p(CardText, "text-sm");
// └──> 🤯 COMPOSABLE 🤯
