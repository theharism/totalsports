export function extractTeamsFromSlug(slug: string) {
    const cleanedSlug = slug.replace(/-\d+$/, ''); // Remove numbers after last hyphen
    const parts = cleanedSlug.split(/-vs-/i); // Split by "vs" (case-insensitive)

    if (parts.length === 2) {
        return {
        teamOneName: parts[0].replace(/-/g, ' ').trim(), // Replace hyphens with spaces
        teamTwoName: parts[1].replace(/-/g, ' ').trim()
        };
    }

    return { teamOneName: null, teamTwoName: null }; // Fallback in case format is incorrect
}
  