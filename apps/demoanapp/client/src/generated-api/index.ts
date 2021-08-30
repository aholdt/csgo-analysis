// @ts-nocheck
/*
    Cats example generated
    The cats API description
    version: 1.0

*/

export class Configuration {
	basePath? = '';
	fetchMethod = window.fetch;
	headers?: any = {};
    getHeaders: any = () => { return {} };

	constructor(config: Configuration | any) {
	    if (config) {
	        if (config.basePath) {
                this.basePath = config.basePath;
            }
            if (config.fetchMethod) {
                this.fetchMethod = config.fetchMethod;
            }
            if (config.headers) {
                this.headers = config.headers;
            }
            if (config.getHeaders) {
                this.getHeaders = config.getHeaders;
            }
	    }
	}
}


export class CreateCatDto {
	name?: string;
	age?: number;
	breed?: string;

	constructor(obj: CreateCatDto) {
        this.name = obj.name;
        this.age = obj.age;
        this.breed = obj.breed;
	}
}

export class Cat {
	age?: number;
	breed?: string;
	name?: string;

	constructor(obj: Cat) {
        this.age = obj.age;
        this.breed = obj.breed;
        this.name = obj.name;
	}
}

export class Position {
	tick?: number;
	x?: number;
	y?: number;
	z?: number;

	constructor(obj: Position) {
        this.tick = obj.tick;
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
	}
}

export class BombEvent {
	type?: any;
	tick?: number;
	userId?: number;
	position?: Position;

	constructor(obj: BombEvent) {
        this.type = obj.type;
        this.tick = obj.tick;
        this.userId = obj.userId;
        this.position = obj.position;
	}
}

export class Inventory {
	inventory?: string[];
	userId?: number;
	tick?: number;

	constructor(obj: Inventory) {
        this.inventory = obj.inventory;
        this.userId = obj.userId;
        this.tick = obj.tick;
	}
}

export class Kill {
	tick?: number;
	killer?: number;
	assister?: number;
	victim?: number;
	weapon?: string;

	constructor(obj: Kill) {
        this.tick = obj.tick;
        this.killer = obj.killer;
        this.assister = obj.assister;
        this.victim = obj.victim;
        this.weapon = obj.weapon;
	}
}

export class BlindedPlayer {
	playerId?: number;
	startTick?: number;
	endTick?: number;

	constructor(obj: BlindedPlayer) {
        this.playerId = obj.playerId;
        this.startTick = obj.startTick;
        this.endTick = obj.endTick;
	}
}

export class Utility {
	playerId?: number;
	type?: any;
	tickThrown?: number;
	tickDetonated?: number;
	tickExpired?: number;
	throwFrom?: Position;
	throwTo?: Position;
	damagedPlayerIds?: string[];
	blindedPlayers?: BlindedPlayer[];
	path?: Position[];
	entityId?: number;

	constructor(obj: Utility) {
        this.playerId = obj.playerId;
        this.type = obj.type;
        this.tickThrown = obj.tickThrown;
        this.tickDetonated = obj.tickDetonated;
        this.tickExpired = obj.tickExpired;
        this.throwFrom = obj.throwFrom;
        this.throwTo = obj.throwTo;
        this.damagedPlayerIds = obj.damagedPlayerIds;
        this.blindedPlayers = obj.blindedPlayers;
        this.path = obj.path;
        this.entityId = obj.entityId;
	}
}

export class PlayerHurt {
	tick?: number;
	targetPlayerId?: number;
	healthAfterDamage?: number;

	constructor(obj: PlayerHurt) {
        this.tick = obj.tick;
        this.targetPlayerId = obj.targetPlayerId;
        this.healthAfterDamage = obj.healthAfterDamage;
	}
}

export class PlayerShot {
	tick?: number;
	x?: number;
	y?: number;
	z?: number;
	firingWeapon?: string;
	playerId?: number;
	yaw?: number;

	constructor(obj: PlayerShot) {
        this.tick = obj.tick;
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
        this.firingWeapon = obj.firingWeapon;
        this.playerId = obj.playerId;
        this.yaw = obj.yaw;
	}
}

export class PlayerPosition {
	tick?: number;
	x?: number;
	y?: number;
	z?: number;
	playerId?: number;
	yaw?: number;

	constructor(obj: PlayerPosition) {
        this.tick = obj.tick;
        this.x = obj.x;
        this.y = obj.y;
        this.z = obj.z;
        this.playerId = obj.playerId;
        this.yaw = obj.yaw;
	}
}

export class RoundReplay {
	roundNumber?: number;
	startTick?: number;
	endTick?: number;
	positions?: PlayerPosition[];
	playerShot?: PlayerShot[];
	playersHurt?: PlayerHurt[];
	utilities?: Utility[];
	kills?: Kill[];
	inventories?: Inventory[];
	bombEvents?: BombEvent[];

	constructor(obj: RoundReplay) {
        this.roundNumber = obj.roundNumber;
        this.startTick = obj.startTick;
        this.endTick = obj.endTick;
        this.positions = obj.positions;
        this.playerShot = obj.playerShot;
        this.playersHurt = obj.playersHurt;
        this.utilities = obj.utilities;
        this.kills = obj.kills;
        this.inventories = obj.inventories;
        this.bombEvents = obj.bombEvents;
	}
}

export class MethodOptions {
	headers?: any = {};
	returnResponse?: boolean = false;

	constructor(options: MethodOptions) {
		if (options.headers) {
			this.headers = options.headers;
		}
		if (options.returnResponse) {
			this.returnResponse = options.returnResponse;
		}
	}
}

export class CatsIdGetArgs {
	id: string;

	constructor(args: CatsIdGetArgs) {
        this.id = args.id;
	}
}

export class RoundreplaysGameIdRoundNumberGetArgs {
	gameId: string;
	roundNumber: number;

	constructor(args: RoundreplaysGameIdRoundNumberGetArgs) {
        this.gameId = args.gameId;
        this.roundNumber = args.roundNumber;
	}
}

export class CatsApi {
    private readonly config: Configuration;

    constructor(config: Configuration | any) {
        this.config = new Configuration(config);
    }

	catsPost(body?: CreateCatDto, options: MethodOptions | any = {}): Promise<any> { 
        const {fetchMethod, basePath, headers, getHeaders} = this.config;
		let url = '/cats';
        const params = new URLSearchParams();
		const query = params.toString();
		return new Promise((resolve, reject) => {
			const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
				method: 'post',
                headers: { 'Content-Type': 'application/json', ...headers, ...getHeaders(), ...options.headers},
                body: 'object' === typeof body ? JSON.stringify(body) : body
			});
            promise.then(response => {
                if (response.status === 200 || response.status === 204) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
			promise.catch(error => reject(error));
		});
	}

	catsIdGet(args: CatsIdGetArgs, options: MethodOptions | any = {}): Promise<Cat> { 
        const { id } = args;
        const {fetchMethod, basePath, headers, getHeaders} = this.config;
		let url = '/cats/{id}';
		url = url.split(['{', '}'].join('id')).join(encodeURIComponent(String(id)));
        const params = new URLSearchParams();
		const query = params.toString();
		return new Promise((resolve, reject) => {
			const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
				method: 'get',
                headers: { ...headers, ...getHeaders(), ...options.headers}
			});
                if (options.returnResponse) {
                    promise.then(response => resolve(response as any));
                } else {
                    promise.then(response => {
                        if (response.status === 200 || response.status === 204) {
                            return response.json();
                        } else {
                            reject(response);
                        }
                    }).then(data => resolve(data));
                }
			promise.catch(error => reject(error));
		});
	}
}

export class FilesApi {
    private readonly config: Configuration;

    constructor(config: Configuration | any) {
        this.config = new Configuration(config);
    }

	filePost(body?: any, options: MethodOptions | any = {}): Promise<any> { 
        const {fetchMethod, basePath, headers, getHeaders} = this.config;
		let url = '/file';
        const params = new URLSearchParams();
		const query = params.toString();
		return new Promise((resolve, reject) => {
            const formData = new FormData();
			const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
				method: 'post',
                headers: { 'Content-Type': 'multipart/form-data', ...headers, ...getHeaders(), ...options.headers},
                body: 'object' === typeof body ? JSON.stringify(body) : body,
                body: formData
			});
            promise.then(response => {
                if (response.status === 200 || response.status === 204) {
                    resolve(response);
                } else {
                    reject(response);
                }
            });
			promise.catch(error => reject(error));
		});
	}
}

export class RoundreplaysApi {
    private readonly config: Configuration;

    constructor(config: Configuration | any) {
        this.config = new Configuration(config);
    }

	roundreplaysGameIdRoundNumberGet(args: RoundreplaysGameIdRoundNumberGetArgs, options: MethodOptions | any = {}): Promise<RoundReplay> { 
        const { gameId, roundNumber } = args;
        const {fetchMethod, basePath, headers, getHeaders} = this.config;
		let url = '/roundreplays/{gameId}/{roundNumber}';
		url = url.split(['{', '}'].join('gameId')).join(encodeURIComponent(String(gameId)));
		url = url.split(['{', '}'].join('roundNumber')).join(encodeURIComponent(String(roundNumber)));
        const params = new URLSearchParams();
		const query = params.toString();
		return new Promise((resolve, reject) => {
			const promise = fetchMethod(basePath + url + (query ? '?' + query : ''), {
				method: 'get',
                headers: { ...headers, ...getHeaders(), ...options.headers}
			});
                if (options.returnResponse) {
                    promise.then(response => resolve(response as any));
                } else {
                    promise.then(response => {
                        if (response.status === 200 || response.status === 204) {
                            return response.json();
                        } else {
                            reject(response);
                        }
                    }).then(data => resolve(data));
                }
			promise.catch(error => reject(error));
		});
	}
}
