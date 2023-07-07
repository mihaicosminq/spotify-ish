"use client";

import Modal from "@/components/Modal";
import {useSessionContext, useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/navigation";
import {Auth} from "@supabase/auth-ui-react";
import theme from "tailwindcss/defaultTheme";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import {useEffect} from "react";

const AuthModal = () => {

    const supabaseClient = useSupabaseClient();
    const router = useRouter();
    const {session} = useSessionContext();
    const {onClose,isOpen} = useAuthModal();
    const onChange =(open:boolean) =>{
        if(!open){
            onClose();
        }
    }
    useEffect(()=>{
        if(session){
            router.refresh();
            onClose();
        }
    },[session,router,onClose])


    return (
        <Modal title="welcome" description="login" isOpen={isOpen} onChange={onChange} >
            <Auth supabaseClient={supabaseClient}
                  theme="dark"
                  magicLink
                  providers={["github"]}
                  appearance={{
                      theme: ThemeSupa,
                      variables: {
                          default: {
                              colors: {
                                  brand: "#404040",
                                  brandAccent: "#22c55e"
                              }
                          }
                      }
                  }}/>
        </Modal>


    )
}
export default AuthModal;