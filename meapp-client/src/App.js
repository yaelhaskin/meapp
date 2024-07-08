import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery, useQueryClient } from 'react-query';

import PageManager from "./pages/PageManager"

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient} contextSharing={true}>
          <PageManager />
      </QueryClientProvider>
    </div>
  );
}

export default App;
