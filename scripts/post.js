// api link goes here

// Function to get the slug from the URL
const getSlugFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("slug");
};

// GraphQL query to get a single post by its slug
const getPostBySlug = async (slug) => {
    const query = `
        query GetPost($slug: String!) {
            post(where: { slug: $slug }) {
            title
            content {
                html
            }
            featuredImage {
                url
            }
            date
            }
        }
    `;

    const variables = { slug };

    try {
        const response = await fetch(graphqlAPI, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query, variables }),
        });

        const result = await response.json();
        return result.data.post;
    } catch (error) {
        console.error("Error fetching post:", error);
    }
};

// Function to display the post on the page
const displayPost = async () => {
    const slug = getSlugFromUrl();
    if (!slug) {
        document.getElementById("post-content").innerHTML =
        "<p>Post not found.</p>";
        return;
    }

    const post = await getPostBySlug(slug);

    if (!post) {
        document.getElementById("post-content").innerHTML =
        "<p>Post not found.</p>";
        return;
    }

    const postContentContainer = document.getElementById("post-content");

    postContentContainer.innerHTML = `
            <img src="${post.featuredImage.url}" alt="${
        post.title
    }" class="w-full h-64 object-cover rounded-md">
            <h2 class="text-3xl font-bold mt-6">${post.title}</h2>
            <p class="text-gray-600 text-sm mt-2">${new Date(
            post.date
            ).toDateString()}</p>
            <div class="mt-4">${post.content.html}</div>
        `;
};

document.addEventListener("DOMContentLoaded", displayPost);
