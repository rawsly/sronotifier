const format = require('date-fns/format');

const UNIQUE_IMAGES_BASE_URL = 'https://rawsly.com/silkroad/unique';
const UNIQUES = Object.freeze({
	TIGER_GIRL: {
		code: 'TIGER_GIRL',
		name: 'Tiger Girl',
		hp: '598.720',
		level: '20',
		avatar: `${UNIQUE_IMAGES_BASE_URL}/tiger-girl.jpg`,
		spawn: `${UNIQUE_IMAGES_BASE_URL}/tiger-girl-spawn.jpg`,
	},
	CERBERUS: {
		code: 'CERBERUS',
		name: 'Cerberus',
		hp: '693.072',
		level: '24',
		avatar: `${UNIQUE_IMAGES_BASE_URL}/cerberus.jpg`,
		spawn: `${UNIQUE_IMAGES_BASE_URL}/cerberus-spawn.jpg`,
	},
	CAPTAIN_IVY: {
		code: 'CAPTAIN_IVY',
		name: 'Captain Ivy',
		hp: '1.094.835',
		level: '30',
		avatar: `${UNIQUE_IMAGES_BASE_URL}/captain-ivy.jpg`,
		spawn: `${UNIQUE_IMAGES_BASE_URL}/captain-ivy-spawn.jpg`,
	},
	URUCHI: {
		code: 'URUCHI',
		name: 'Uruchi',
		hp: '1.779.528',
		level: '40',
		avatar: `${UNIQUE_IMAGES_BASE_URL}/uruchi.jpg`,
		spawn: `${UNIQUE_IMAGES_BASE_URL}/uruchi-spawn.jpg`,
	},
	ISYUTARU: {
		code: 'ISYUTARU',
		name: 'Isyutaru',
		hp: '4.324.612',
		level: '60',
		avatar: `${UNIQUE_IMAGES_BASE_URL}/isyutaru.jpg`,
		spawn: `${UNIQUE_IMAGES_BASE_URL}/isyutaru-spawn.jpg`,
	},
	LORD_YARKAN: {
		code: 'LORD_YARKAN',
		name: 'Lord Yarkan',
		hp: '9.353.045',
		level: '80',
		avatar:  `${UNIQUE_IMAGES_BASE_URL}/lord-yarkan.jpg`,
		spawn:  `${UNIQUE_IMAGES_BASE_URL}/lord-yarkan-spawn.jpg`,
	},
	DEMON_SHAITAN: {
		code: 'DEMON_SHAITAN',
		name: 'Demon Shaitan',
		hp: '12.732.060',
		level: '90',
		avatar:  `${UNIQUE_IMAGES_BASE_URL}/demon-shaitan.jpg`,
		spawn:  `${UNIQUE_IMAGES_BASE_URL}/demon-shaitan-spawn.jpg`,
	},
	MEDUSA: {
		code: 'MEDUSA',
		name: 'BeakYung The White Wiper',
		hp: '183.535.199',
		level: '100',
		avatar:  `${UNIQUE_IMAGES_BASE_URL}/medusa.jpg`,
	},
	ROC: {
		code: 'ROC',
		name: 'Roc',
		hp: 'Unknown',
		level: '107',
		avatar: `${UNIQUE_IMAGES_BASE_URL}/roc.jpg`,
	},
});

const CHANNEL_IDS = {
	global: '909062022577131572',
	uniques: '909062044484005898',
	drops: '909062765065424926',
	disconnects: '909062801824288779',
	private: '909062838801293322',
	party: '909134457016053830',
	dead: '909062926013444116'
};

const formatDate = (date = new Date()) => format(date, 'HH:mm - dd/MM/yyyy');

const COLORS = {
	default: '#D7816A',
	red: '#f56565',
}

module.exports = { UNIQUES, CHANNEL_IDS, COLORS, formatDate };