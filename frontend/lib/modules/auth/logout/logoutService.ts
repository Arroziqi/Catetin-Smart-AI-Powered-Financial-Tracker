export async function logoutService() {
    const response = await fetch("/api/auth/logout", {
        method: "POST",
    });

    if (!response.ok) {
        throw new Error("Logout gagal");
    }

    return response.json();
}