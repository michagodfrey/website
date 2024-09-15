// api link goes here

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
            // If your API requires an auth token, you can add it here:
            // 'Authorization': `Bearer YOUR_TOKEN`,
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

    const blogPostsContainer = document.getElementById("blog-posts");

    posts.forEach(({ node }) => {
        const postElement = document.createElement("div");
        postElement.classList.add(
        "bg-white",
        "rounded-lg",
        "shadow-lg",
        "p-6",
        "mb-6"
        );

        postElement.innerHTML = `
                <img src="${node.featuredImage.url}" alt="${
        node.title
        }" class="w-full h-48 object-cover rounded-md">
                <h3 class="text-xl font-semibold mt-4">${node.title}</h3>
                <p class="text-gray-600 text-sm mt-2">${new Date(
                node.date
                ).toDateString()}</p>
                <p class="mt-4">${node.excerpt}</p>
                <a href="/post.html?slug=${
                node.slug
                }" class="text-blue-500 hover:underline mt-4 block">Read More</a>
            `;

        blogPostsContainer.appendChild(postElement);
    });
};

document.addEventListener("DOMContentLoaded", displayPosts);
