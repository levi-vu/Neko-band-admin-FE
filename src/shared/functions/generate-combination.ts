export default function generateCombinations(lists: string[][], currentCombination: string[] = [], currentIndex = 0): string[][] {
	if (lists.every((i) => i.length === 0)) {
		return [];
	}

	if (currentIndex === lists.length) {
		return [currentCombination];
	}

	const currentList = lists[currentIndex];
	const combinations = [];

	if (currentList.length === 0) {
		const subCombinations = generateCombinations(lists, currentCombination, currentIndex + 1);
		combinations.push(...subCombinations);
	} else {
		for (const item of currentList) {
			const newCombination = [...currentCombination, item];
			const subCombinations = generateCombinations(lists, newCombination, currentIndex + 1);
			combinations.push(...subCombinations);
		}
	}

	return combinations;
}
