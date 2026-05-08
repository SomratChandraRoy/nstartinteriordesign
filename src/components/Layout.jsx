import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import WhatsAppFAB from "./WhatsAppFAB";
import SmoothScrollProvider from "./SmoothScrollProvider";

export default function Layout({ children }) {
  return (
    <>
      <GlobalStyles />
      <CustomCursor />
      <Header />
      <WhatsAppFAB />
      <SmoothScrollProvider>
        <main className="font-body">
          {children}
          <Footer />
        </main>
      </SmoothScrollProvider>
    </>
  );
}
