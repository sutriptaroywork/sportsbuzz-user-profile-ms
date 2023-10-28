export default {
    status: {
        values: ['Y', 'N'],
        message: '{VALUE} is not supported'
    },
    user: {
        userStatus: {
            values: ['Y', 'N', 'D'],
            message: '{VALUE} is not supported'
        },
        userType: {
            values: ['U', 'B', 'CB'], // U = USER, B = BOT, CB = COPY_BOT
            message: '{VALUE} is not supported'
        },
        userGender: {
            values: ['M', 'F', 'O'],
            message: '{VALUE} is not supported'
        },
        userTypeForJoinLeague: {
            values: ['U', 'B', 'CB', 'CMB'], // U = USER, B = BOT, CB = COPY_BOT, CMB = COMBINATION_BOT
            message: '{VALUE} is not supported'
        }
    },
    transactionType: {
        values: ['Bonus', 'Refer-Bonus', 'Deposit', 'Withdraw', 'Win', 'Play', 'Bonus-Expire', 'Play-Return', 'Win-Return', 'Opening', 'Creator-Bonus', 'TDS', 'Withdraw-Return', 'Cashback-Contest', 'Cashback-Return', 'Creator-Bonus-Return', 'Loyalty-Point'],
        message: '{VALUE} is not supported'
    },
    passbookType: {
        values: ['Dr', 'Cr'],
        message: '{VALUE} is not supported'
    },
    passbookStatus: {
        values: ['R', 'CMP', 'CNCL'], // CMP = Complete  R = REFUND  CNCL = CANCEL
        message: '{VALUE} is not supported'
    },
    socialType: {
        values: ['G', 'F', 'A', 'T'],
        message: '{VALUE} is not supported'
    },
    platform: {
        values: ['A', 'I', 'W', 'O', 'AD'], // A = Android, I = iOS, W = Web, O = Other, AD = Admin
        message: '{VALUE} is not supported'
    },
    seriesLBCategoriesTemplateType: {
        values: ['CONTEST_JOIN', 'PRIZE_WON', 'LOYALTY_POINTS', 'LOYALTY_DEPOSIT_POINTS'],
        message: '{VALUE} is not supported'
    },
    leagueRankType: {
        values: ['R', 'B', 'E'],
        message: '{VALUE} is not supported'
    },
    tableDetails: {
        user: {
            tableName: 'users',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt'
        },
        userBalance: {
            tableName: 'userbalances',
            idFieldName: 'id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
            indexedField: {
                fields: ['iUserId']
            }
        },
        commonRules: {
            tableName: 'commonrules',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt'
        },
        passbook: {
            tableName: 'passbooks',
            idFieldName: 'id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
            indexedField_1: {
                fields: ['iUserId', 'dCreatedAt', 'eTransactionType']
            },
            indexedField_2: {
                name: 'passbooks_unique',
                fields: ['iUserId', 'iUserLeagueId', 'eTransactionType', 'iUserDepositId', 'iWithdrawId']
            }
        },
        statistics: {
            tableName: 'statistics',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        match: {
            tableName: 'matches',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        team: {
            tableName: 'teams',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        season: {
            tableName: 'seasons',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        seriesLBCategoriesTemplate: {
            tableName: 'series_leader_board_categories_templates',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        seriesLB: {
            tableName: 'seriesleaderboards',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        states: {
            tableName: 'states',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        cities: {
            tableName: 'cities',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        myMatches: {
            tableName: 'mymatches',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        matchLeague: {
            tableName: 'matchleagues',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        userLeague: {
            tableName: 'userleagues',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        userTeam: {
            tableName: 'userteams',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        matchPlayer: {
            tableName: 'matchplayers',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        matchTeam: {
            tableName: 'matchteams',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        player: {
            tableName: 'players',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        promocode: {
            tableName: 'promocodes',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        league: {
            tableName: 'leagues',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        leagueCategory: {
            tableName: 'leaguecategories',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        filterCategory: {
            tableName: 'filtercategories',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        seriesLBUserRank: {
            tableName: 'series_leader_boards_user_ranks',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        admin: {
            tableName: 'admins',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        },
        adminLogs: {
            tableName: 'adminlogs',
            idFieldName: '_id',
            createdAtFieldName: 'dCreatedAt',
            updatedAtFieldName: 'dUpdatedAt',
        }
    },
    match: {
        format: {
            values: ['T10', 'T20', 'ODI', 'BASEBALL', '100BALL', 'FOOTBALL', 'BASKETBALL', 'KABADDI', 'TEST', 'FIRSTCLASS'],
            message: '{VALUE} is not supported'
        },
        status: {
            values: ['P', 'U', 'L', 'CMP', 'CNCL', 'I'], // P = Pending, U = Upcoming, L = Live, CMP = Completed, CNCL = Cancel, I = Inreview
            message: '{VALUE} is not supported'
        },
        matchTossWinnerAction: {
            values: ['BAT', 'BOWLING'],
            message: '{VALUE} is not supported'
        },
        category: {
            values: ['CRICKET', 'FOOTBALL', 'KABADDI', 'BASEBALL', 'BASKETBALL'],
            message: '{VALUE} is not supported'
        },
        matchProvider: {
            values: ['SPORTSRADAR', 'CUSTOM', 'ENTITYSPORT', 'GOALSERVE'],
            message: '{VALUE} is not supported'
        },
        leagueReportStatus: {
            values: ['N', 'P', 'S'], // N - Not generated, P - In process , S - Success
            message: '{VALUE} is not supported'
        },
        player: {
            role: {
                values: ['BATS', 'BWL', 'ALLR', 'WK', 'IF', 'OF', 'P', 'CT', 'GK', 'DEF', 'MID', 'FWD', 'PG', 'SG', 'PF', 'SF', 'C', 'RAID'],
                message: '{VALUE} is not supported'
            }
        },
    },
    errorDetails: {
        balanceNotFound: 'User balanace not found'
    },
    ruleType: {
        values: ['C', 'B', 'D'], // C = CASH, B = BONUS, D = DEPOSIT
        message: '{VALUE} is not supported'
    },
    promocode: {
        promocodeTypes: {
            values: ['DEPOSIT', 'MATCH', 'SERIES'],
            message: '{VALUE} is not supported'
        },
        promoOffer: {
            values: ['FIRST_DEPOSIT'],
            message: '{VALUE} is not supported'
        }
    },
    imageFormat: [{ extension: 'jpeg', type: 'image/jpeg' }, { extension: 'jpg', type: 'image/jpeg' }, { extension: 'png', type: 'image/png' }, { extension: 'gif', type: 'image/gif' }, { extension: 'svg', type: 'image/svg+xml' }, { extension: 'heic', type: 'image/heic' }, { extension: 'heif', type: 'image/heif' }],
    userGender: ['M', 'F', 'O'],
    adminLogKeys: ['D', 'W', 'P', 'KYC', 'BD', 'SUB', 'AD', 'AW', 'PC', 'L', 'PB', 'M', 'ML', 'CR', 'S', 'MP', 'CF', 'SLB'], // D = DEPOSIT, W = WITHDRAW, P = PROFILE, BD = BANK DETAILS, SA = SUBADMIN, AD = ADMIN DEPOSIT, AW = ADMIN WITHDRAW, PC = PROMOCODE, L = LEAGUE, PB = PRIZE BREAKUP, M = MATCH, ML = MATCHLEAGUE, CR = COMMON RULE, S = SETTINGS, MP= MATCHPLAYER, CF = COMPLAINTS/FEEDBACK, SLB = SERIES LEADERBOARD
}
