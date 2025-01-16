// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import { ThemeProvider } from "@/hooks/use-theme";
//import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
//import Contact from "./pages/Contact";
//import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    {/* <ThemeProvider> */}
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          {/* <Navbar /> */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Index />} />
              {/* <Route path="/contact" element={<Contact />} />
                <Route path="/settings" element={<Settings />} /> */}
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
    {/* </ThemeProvider> */}
  </QueryClientProvider>
);

export default App;
