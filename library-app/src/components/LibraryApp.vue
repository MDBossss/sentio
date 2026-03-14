<template>
  <div class="library-container">
    <h1 class="library-title">📚 Library Application</h1>
    <div class="library-content">
      <div class="book-list">
        <div v-for="book in books" :key="book.id" class="book-card">
          <h3>{{ book.title }}</h3>
          <p class="author">by {{ book.author }}</p>
          <p class="description">{{ book.description }}</p>
          <span class="badge">{{ book.year }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LibraryApp",
  data() {
    return {
      books: [
        {
          id: 1,
          title: "Vue.js Guide",
          author: "Vue Team",
          description:
            "Comprehensive guide to building applications with Vue.js",
          year: 2023,
        },
        {
          id: 2,
          title: "Web Components",
          author: "Various Authors",
          description: "Learn how to build reusable web components",
          year: 2022,
        },
        {
          id: 3,
          title: "Module Federation",
          author: "Webpack Team",
          description: "Build scalable applications with module federation",
          year: 2023,
        },
      ],
    };
  },
};
</script>

<style scoped>
.library-container {
  padding: 20px;
  font-family: Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  color: white;
}

.library-title {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}

.library-content {
  max-width: 1000px;
  margin: 0 auto;
}

.book-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.book-card {
  background: white;
  color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.book-card h3 {
  margin: 0 0 10px 0;
  color: #667eea;
}

.author {
  margin: 5px 0;
  font-style: italic;
  color: #666;
  font-size: 14px;
}

.description {
  margin: 10px 0;
  line-height: 1.5;
  color: #555;
  font-size: 14px;
}

.badge {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  margin-top: 10px;
}
</style>
