import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthShell } from "@/components/deepshield/AuthShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth/signup")({
  head: () => ({ meta: [{ title: "Create account — DeepShield" }] }),
  component: SignUp,
});

function SignUp() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Free during beta. No credit card required."
      footer={<>Already have an account? <Link to="/auth/signin" className="font-medium text-primary hover:underline">Sign in</Link></>}
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
          <Label htmlFor="name">Full name</Label>
          <Input id="name" placeholder="Jane Doe" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="you@example.com" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" className="w-full shadow-elegant">Create account</Button>
      </form>
    </AuthShell>
  );
}
