'use client'
import { LoginForm } from "@/components/login-form"
import { useAuth } from "@/hooks/user-auth"


export default function Page() {
  const {signInForm, handleSignIn,isLoading}=useAuth()
  const{
    register,
    handleSubmit,
    formState:{errors},
  }= signInForm
  return (
    
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10" suppressHydrationWarning>
      
      <div className="w-full max-w-sm" suppressHydrationWarning>
      
        <LoginForm 
          register={register}
          onSubmit={handleSubmit(handleSignIn)}
          errors={errors}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
