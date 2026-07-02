import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/deepshield/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/signin")({
  head: () => ({ meta: [{ title: "Sign in — DeepShield" }] }),
  component: SignIn,
});

function SignIn() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to your DeepShield account."
      footer={<>Don't have an account? <Link to="/auth/signup" className="font-medium text-primary hover:underline">Create one</Link></>}
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid gap-2">
          <Button variant="outline" type="button">Continue with Google</Button>
          <Button variant="outline" type="button">Continue with GitHub</Button>
        </div>
        <div className="relative my-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
          <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/auth/forgot" className="text-xs text-muted-foreground hover:text-foreground">Forgot?</Link>
          </div>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" className="w-full shadow-elegant">Sign in</Button>
      </form>
    </AuthShell>
  );
}
