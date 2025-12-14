import { useAuthActions  } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

const signInSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signUpSchema = z.object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    
});

type signInData = z.infer<typeof signInSchema>;
type signUpData = z.infer<typeof signUpSchema>;
export const useAuth = () => {
    const authActions = useAuthActions();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const signInForm= useForm<signInData>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },

    })
    const signUpForm= useForm<signUpData>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
        },
    })
    const handleSignIn = async (data: signInData) => {
        if (!authActions) return;
        setIsLoading(true); 
        try {
            await authActions.signIn("password", {
                email: data.email,
                password: data.password,
                flow: "sign-in",
            });
            router.push('/dashboard')
        } catch (error){
            console.error(error)
            signInForm.setError('password',{
                message:'invalid password',
            
            })
            } finally{
                setIsLoading(false)
            }
            

    }
    const handleSignUp = async (data: signUpData) => {
        if (!authActions) return;
        setIsLoading(true); 
        try {
            await authActions.signIn("password", {
                email: data.email,
                password: data.password,
                name:`${data.firstName} ${data.lastName}`,
                flow: 'signUp',
            });
            router.push('/dashboard')
        } catch (error){
            console.error(error)
            signUpForm.setError('root',{
                message:'failed to create an account, Email already existed',
            
            })
            } finally{
                setIsLoading(false)
            }
        
    }
    const handleSignOut = async () => {
        if (!authActions) return;
        try{
            await authActions.signOut()
            router.push('/auth/sign-in')
        }catch(error){
            console.error('Sign Out Error:',error)
        }
        setIsLoading(true); 
        setIsLoading(false); 
    }
    return{
        signInForm,
        signUpForm,
        handleSignIn,
        handleSignUp,
        handleSignOut,
        isLoading,
    }
}
