import React, { useState, useEffect } from "react";

const TrendingPage = () => {
  const { chainId } = useParams();
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");
  const [sortDirection, setSortDirection] = useState("desc");
  const [isFiltersModalOpen, setFiltersModalOpen] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  // Add the handler for applying filters
  const handleApplyFilters = (filteredTokens) => {
    setTokens(filteredTokens);
    setIsFiltered(true);
  };

  useEffect(() => {
    fetchTokens();
  }, [chainId]);

  const fetchTokens = async () => {
    setLoading(true);
    try {
      // Convert URL path parameter to chain ID for API
      const apiChainId = chainId ? PATH_TO_CHAIN_ID[chainId] || chainId : "";
      console.log(
        `Fetching tokens for chain: ${apiChainId} (from URL: ${chainId})`
      );

      const data = await getTrendingTokens(apiChainId);
      setTokens(data);
    } catch (error) {
      console.error("Error fetching tokens:", error);
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (column) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("desc");
    }
  };

  return (
    <div className="flex flex-col h-full">
      <TopBar
        chainId={chainId}
        isFiltered={isFiltered}
        openFiltersModal={() => setFiltersModalOpen(true)}
        sortBy={sortBy}
        onSortChange={handleSortChange}
      />
      <TrendingTable
        tokens={tokens}
        loading={loading}
        sortBy={sortBy}
        sortDirection={sortDirection}
        onSortChange={handleSortChange}
      />

      <FiltersModal
        isOpen={isFiltersModalOpen}
        onClose={() => setFiltersModalOpen(true)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  );
};

export default TrendingPage;