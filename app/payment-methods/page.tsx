import NewHeader from "@/components/new-header"
import { Button } from "@/components/ui/button"
import { CreditCard, PlusCircle } from "lucide-react"

export default function PaymentMethodsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NewHeader />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
            <h1 className="text-3xl font-bold flex items-center">
              <CreditCard className="w-8 h-8 mr-3 text-primary" />
              Manage Payment Methods
            </h1>
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Add New Method
            </Button>
          </div>

          <div className="bg-card p-8 rounded-lg shadow-md border border-border">
            <h2 className="text-xl font-semibold mb-6 text-center text-muted-foreground">
              You currently have no saved payment methods.
            </h2>
            <p className="text-center text-muted-foreground mb-6">
              Add a payment method for faster checkouts in the future. We securely store your payment details.
            </p>
            <div className="flex justify-center">
              <Button variant="outline" size="lg" className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Add Your First Payment Method
              </Button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Secure & Encrypted</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Your payment information is protected with industry-standard encryption. We prioritize your security and
              privacy.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
