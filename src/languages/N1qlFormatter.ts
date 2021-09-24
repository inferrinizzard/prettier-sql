import Formatter from '../core/Formatter';
import Tokenizer from '../core/Tokenizer';

const reservedWords = [
	'ALL',
	'ALTER',
	'ANALYZE',
	'ANY',
	'ARRAY',
	'AS',
	'ASC',
	'BEGIN',
	'BETWEEN',
	'BINARY',
	'BOOLEAN',
	'BREAK',
	'BUCKET',
	'BUILD',
	'BY',
	'CALL',
	'CAST',
	'CLUSTER',
	'COLLATE',
	'COLLECTION',
	'COMMIT',
	'CONNECT',
	'CONTINUE',
	'CORRELATE',
	'COUNT',
	'COVER',
	'CREATE',
	'DATABASE',
	'DATASET',
	'DATASTORE',
	'DECLARE',
	'DECREMENT',
	'DELETE',
	'DERIVED',
	'DESC',
	'DESCRIBE',
	'DISTINCT',
	'DO',
	'DROP',
	'EACH',
	'ELEMENT',
	'ELSE',
	'END',
	'EVERY',
	'EXCLUDE',
	'EXECUTE',
	'EXISTS',
	'EXPLAIN',
	'FALSE',
	'FETCH',
	'FIRST',
	'FLATTEN',
	'FOR',
	'FORCE',
	'FUNCTION',
	'GRANT',
	'GROUP',
	'GSI',
	'IF',
	'IGNORE',
	'ILIKE',
	'IN',
	'INCLUDE',
	'INCREMENT',
	'INDEX',
	'INLINE',
	'INNER',
	'INSERT',
	'INTERSECT',
	'INTO',
	'IS',
	'KEY',
	'KEYS',
	'KEYSPACE',
	'KNOWN',
	'LAST',
	'LEFT',
	'LETTING',
	'LIKE',
	'LSM',
	'MAP',
	'MAPPING',
	'MATCHED',
	'MATERIALIZED',
	'MISSING',
	'NAMESPACE',
	'NOT',
	'NULL',
	'NUMBER',
	'OBJECT',
	'OFFSET',
	'OPTION',
	'ORDER',
	'OUTER',
	'OVER',
	'PARSE',
	'PARTITION',
	'PASSWORD',
	'PATH',
	'POOL',
	'PRIMARY',
	'PRIVATE',
	'PRIVILEGE',
	'PROCEDURE',
	'PUBLIC',
	'RAW',
	'REALM',
	'REDUCE',
	'RENAME',
	'RETURN',
	'RETURNING',
	'REVOKE',
	'RIGHT',
	'ROLE',
	'ROLLBACK',
	'SATISFIES',
	'SCHEMA',
	'SELF',
	'SEMI',
	'SOME',
	'START',
	'STATISTICS',
	'STRING',
	'SYSTEM',
	'THEN',
	'TO',
	'TRANSACTION',
	'TRIGGER',
	'TRUE',
	'TRUNCATE',
	'UNDER',
	'UNIQUE',
	'UNKNOWN',
	'UNSET',
	'USE',
	'USER',
	'USING',
	'VALIDATE',
	'VALUE',
	'VALUED',
	'VIA',
	'VIEW',
	'WHEN',
	'WHILE',
	'WITHIN',
	'WORK',
];

const reservedTopLevelWords = [
	'DELETE FROM',
	'EXCEPT ALL',
	'EXCEPT',
	'EXPLAIN DELETE FROM',
	'EXPLAIN UPDATE',
	'EXPLAIN UPSERT',
	'FROM',
	'GROUP BY',
	'HAVING',
	'INFER',
	'INSERT INTO',
	'LET',
	'LIMIT',
	'MERGE',
	'NEST',
	'ORDER BY',
	'PREPARE',
	'SELECT',
	'SET CURRENT SCHEMA',
	'SET SCHEMA',
	'SET',
	'SHOW',
	'UNNEST',
	'UPDATE',
	'UPSERT',
	'USE KEYS',
	'VALUES',
	'WHERE',
	'WITH',
];

const reservedTopLevelWordsNoIndent = ['INTERSECT', 'INTERSECT ALL', 'MINUS', 'UNION', 'UNION ALL'];

const reservedNewlineWords = [
	'AND',
	'OR',
	'XOR',
	'ON',
	// joins
	'JOIN',
	'INNER JOIN',
	'LEFT JOIN',
	'LEFT OUTER JOIN',
	'RIGHT JOIN',
	'RIGHT OUTER JOIN',
];

// For reference: http://docs.couchbase.com.s3-website-us-west-1.amazonaws.com/server/6.0/n1ql/n1ql-language-reference/index.html
export default class N1qlFormatter extends Formatter {
	tokenizer() {
		return new Tokenizer({
			reservedWords,
			reservedTopLevelWords,
			reservedNewlineWords,
			reservedTopLevelWordsNoIndent,
			stringTypes: [`""`, "''", '``'],
			openParens: ['(', '[', '{'],
			closeParens: [')', ']', '}'],
			namedPlaceholderTypes: ['$'],
			lineCommentTypes: ['#', '--'],
			operators: ['==', '!='],
		});
	}
}
