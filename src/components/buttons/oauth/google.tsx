'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
} from "@/components/ui/field";
import { useAuthActions } from "@convex-dev/auth/react";

type Props = {
  isLoading?: boolean;
}

const Google = ({ isLoading }: Props) => {
    const authActions = useAuthActions();
    
    const handleGoogleSignIn = async () => {
        if (!authActions) {
            console.error("Auth actions not available. Make sure Convex dev server is running.");
            return;
        }
        try {
            await authActions.signIn("google");
        } catch (error) {
            console.error("Sign in error:", error);
            const errorMessage = error instanceof Error ? error.message : String(error);
            if (errorMessage.includes("Could not find public function")) {
                alert("Convex dev server is not running. Please run 'npx convex dev' in your terminal.");
            }
        }
    };
    
    return (
        
        <Field>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
        <Button variant="outline" type="button" onClick={handleGoogleSignIn}>
          Login with Google
          <span>Google</span>
        </Button>
        <FieldDescription className="text-center">
          Don&apos;t have an account? <a href="#">Sign up</a>
        </FieldDescription>
      </Field>
                
              
    )
}
export default Google;