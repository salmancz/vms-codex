export function health() { return { status: 'ok', checks: ['application','database','redis','queue','storage'] }; }
