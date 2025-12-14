import {SubscriptionEntitlementQuery} from '@/convex/query.config'
import { combinedSlug } from '@/lib/utils'
import { redirect } from 'next/navigation'

const Page = async() => {
    const {entitlement, profileName} = await SubscriptionEntitlementQuery()
    const sessionSlug = combinedSlug(profileName!)
    
    // Always redirect to canvas page
    // If no entitlement, you can uncomment the billing redirect below
    if(!entitlement._valueJSON){
       // redirect(`/billing/${sessionSlug}`)
    }
    
    redirect(`/dashboard/${sessionSlug}`)
}

export default Page