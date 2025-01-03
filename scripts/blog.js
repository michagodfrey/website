const graphqlAPI =
  "https://ap-southeast-2.cdn.hygraph.com/content/cm0op3u8n02io07uxy6vfccu8/master";

const getPosts = async () => {
    const query = `
        query MyQuery {
            postsConnection {
            edges {
                node {
                slug
                title
                date
                excerpt
                featuredImage {
                    url
                }
                categories {
                    slug
                    title
                }
                }
            }
            }
        }
        `;

    try {
        const response = await fetch(graphqlAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
        });

        const result = await response.json();
        return result.data.postsConnection.edges;
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};

const displayPosts = async () => {
  const posts = await getPosts();

  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.node.date) - new Date(a.node.date));

  const blogPostsContainer = document.getElementById("blog-posts");

  posts.forEach(({ node }) => {
    const postElement = document.createElement("div");
    postElement.classList.add(
      "bg-white",
      "rounded-md",
      "shadow-md",
      "p-6",
      "mb-6",
      "flex"
    );

    postElement.innerHTML = `
                <div class="w-1/2">
                    <h3 class="text-2xl font-bold mt-4">${node.title}</h3>
                    <p class="text-gray-600 text-sm mt-2">${new Date(
                      node.date
                    ).toDateString()}</p>
                    <p class="mt-4">${node.excerpt}</p>
                    <a href="/post.html?slug=${
                      node.slug
                    }" class="text-blue-500 font-bold text-xl hover:underline mt-4 block">Read More &rarr;</a>
                </div>
                <div class="w-1/2">
                    <a href="/post.html?slug=${node.slug}">
                        <img src="${node.featuredImage.url}" alt="${
      node.title
    }"class="w-full h-48 object-cover rounded-md">
                    </a>
                </div>        
        `;

    blogPostsContainer.appendChild(postElement);
  });
};

document.addEventListener("DOMContentLoaded", displayPosts);
