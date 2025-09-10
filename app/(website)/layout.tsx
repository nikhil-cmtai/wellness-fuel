import Header from "@/components/layouts/website/Header"
import Footer from "@/components/layouts/website/Footer"


export default function WebsiteLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  )
}