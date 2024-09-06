import type { SimulationSchema } from "./validation";

export function simulate({
	total,
	months,
	previous,
	salary,
}: typeof SimulationSchema.Type) {
	const ra = 0.1;
	const raInTtc = ra * 1.19;
	const quarterly = raInTtc / 12;
	const x44 = quarterly + 1;
	const x45 = months - 2;
	const v46 = quarterly;
	const v45 = months - 1;
	const tauxDende = 0.3; // taux d'endenttement
	const capBrute = salary * tauxDende;
	const capNet = capBrute - previous; // i45 need check
	const maxMontantFinacement = Math.round(
		(((v46 + 1) ** v45 - 1) * capNet) /
			(v46 * (2 * v46 + 1) * (v46 + 1) ** (v45 - 1)),
	);
	const montantFinacement = Math.min(total, maxMontantFinacement);
	const I = montantFinacement * quarterly * 2;
	const x43 = montantFinacement + I;
	const monthly = (x43 * x44 ** x45 * v46) / (x44 ** v45 - 1);
	const hamich = total - montantFinacement;
	const cost = (months - 1) * monthly + hamich;

	return {
		monthly: monthly.toFixed(2),
		aksat: months - 1,
		cost: cost.toFixed(2),
		montantFinacement: montantFinacement.toFixed(2),
		hamich: hamich.toFixed(2),
	};
}

export type SimulationValue = ReturnType<typeof simulate>;
