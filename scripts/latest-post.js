const graphqlAPI =
  "https://ap-southeast-2.cdn.hygraph.com/content/cm0op3u8n02io07uxy6vfccu8/master";

const getLatestPost = async () => {
  const query = `
        query LatestPost {
            postsConnection(first: 1, orderBy: date_DESC) {
                edges {
                    node {
                        slug
                        title
                        date
                        excerpt
                        featuredImage {
                            url
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
    return result.data.postsConnection.edges[0];
  } catch (error) {
    console.error("Error fetching latest post:", error);
  }
};

const displayLatestPost = async () => {
  const post = await getLatestPost();
  if (!post) return;

  const latestPostContainer = document.getElementById("latest-post");
  const { node } = post;

  latestPostContainer.innerHTML = `
        <div class="flex flex-col md:flex-row">
            <div class="md:w-1/2">
                <a href="/post.html?slug=${node.slug}">
                    <img src="${node.featuredImage.url}" 
                        alt="${node.title}" 
                        class="w-full h-64 object-cover">
                </a>
            </div>
            <div class="p-6 md:w-1/2">
                <h3 class="text-2xl font-bold mb-2">${node.title}</h3>
                <p class="text-gray-600 text-sm mb-4">${new Date(
                  node.date
                ).toDateString()}</p>
                <p class="text-gray-700 mb-4">${node.excerpt}</p>
                <a href="/post.html?slug=${node.slug}" 
                  class="text-blue-500 font-bold text-lg hover:underline">
                  Read Latest Post &rarr;
                </a>
            </div> 
        </div>
    `;
};

document.addEventListener("DOMContentLoaded", displayLatestPost);
