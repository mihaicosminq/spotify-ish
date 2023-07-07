"use client"


import {useRouter} from "next/navigation";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import {useUser} from "@/hooks/useUser";
import {useEffect, useState} from "react";
import {postData} from "@/libs/helpers";
import {toast} from "react-hot-toast";
import Button from "@/components/Button";

const AccountContent = () => {
    const router = useRouter();
    const subscribeModal = useSubscribeModal();
    const {isLoading, subscription, user} = useUser();
    const [loading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/")
        }
    }, [isLoading, user, router])

    const redirectCustomerPortal = async () => {
        setIsLoading(true)
        try {
            const {url, error} = await postData({url: "/api/create-portal-link"})
            window.location.assign(url)
        } catch (e) {
            if (e) {
                toast.error((e as Error).message)
            }
        }
        setIsLoading(false);
    }
    return (
        <div className="mb-7 px-6">
            {!subscription && (
                <div className="flex flex-col gap-y-4 ">
                    <p>No active plan</p>
                    <Button onClick={subscribeModal.onOpen} className="w-[300px]">Subscribe </Button>
                </div>)}
            {subscribeModal && (
                <div className="flex flex-col gap-y-4">
                    <p>You are currently on <b>{subscription?.prices?.products?.name}</b> plan.</p>
                    <Button className="w-[300px]" disabled={loading || isLoading} onClick={redirectCustomerPortal}>Open
                        customer portal</Button>
                </div>
            )}
        </div>
    )
}

export default AccountContent;