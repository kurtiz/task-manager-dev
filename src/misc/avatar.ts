export const getRandomHexColor = () => {
    // Generate a random number between 0 and 255 for each RGB channel
    const randomColor = Math.floor(Math.random() * 16777215).toString(16); // 16777215 is 0xFFFFFF
    return `${randomColor.padStart(6, '0')}`;
}

export const getRandomAvatar = (avatars: string[]) => {
    const shuffledArray = avatars.sort(() => Math.random() - 0.5);
    return shuffledArray[0];
}

export const avatars = [
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Emery&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Jack&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Amaya&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Liliana&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Adrian&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Luis&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Mason&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Easton&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Destiny&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Eliza&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Leah&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Riley&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Sadie&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Aidan&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Sophia&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Leo&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Caleb&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/avataaars/svg?seed=Kingston&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Emery&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Jack&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Amaya&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Liliana&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Adrian&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Luis&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Mason&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Easton&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Destiny&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Eliza&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Leah&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Riley&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Sadie&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Sarah&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Aidan&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Sophia&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Leo&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Caleb&backgroundColor=${getRandomHexColor()}`,
    `https://api.dicebear.com/9.x/micah/svg?seed=Kingston&backgroundColor=${getRandomHexColor()}`,
]