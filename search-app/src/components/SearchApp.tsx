import React from "react";

const SearchApp: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Search Application</h1>
      <div style={styles.content}>
        <input
          type="text"
          placeholder="Search something..."
          style={styles.searchInput}
        />
        <button style={styles.searchButton}>Search</button>
      </div>
      <div style={styles.results}>
        <p>Search results will appear here...</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh",
  },
  title: {
    color: "#333",
    marginBottom: "20px",
  },
  content: {
    display: "flex" as const,
    gap: "10px",
    marginBottom: "20px",
  },
  searchInput: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  searchButton: {
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  results: {
    backgroundColor: "white",
    padding: "15px",
    borderRadius: "4px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};

export default SearchApp;
