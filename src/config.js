/* ---------------- */

const { toVersion, attachVersionToObject } = require('./utils');

let config = require('../buttcoin.config') || {}; // load config file

/* ---------------- */

const {
  /** Hard corded peer ip */
  connect = ['192.168.219.108'],

  /** Main net port */
  port = 28888,

  /** The Policy */
  policy: {
    outer: {
      /** The maximum allowed size for a serialized block, in bytes (only for buffer size limits) */
      MAX_BLOCK_SERIALIZED_SIZE = 4000000,

      /** The maximum allowed weight for a block, see BIP 141 (network rule) */
      MAX_BLOCK_WEIGHT = 4000000,

      /** The maximum allowed number of signature check operations in a block (network rule) */
      MAX_BLOCK_SIGOPS_COST = 80000,

      /** Coinbase transaction outputs can only be spent after this number of new blocks (network rule) */
      COINBASE_MATURITY = 100,

      WITNESS_SCALE_FACTOR = 4,

      /** 60 is the lower bound for the size of a valid serialized CTransaction */
      MIN_TRANSACTION_WEIGHT = WITNESS_SCALE_FACTOR * 60,

      /** 10 is the lower bound for the size of a serialized CTransaction */
      MIN_SERIALIZABLE_TRANSACTION_WEIGHT = WITNESS_SCALE_FACTOR * 10,
    } = {},
    inner: {
      // NET-BASE

      DEFAULT_CONNECT_TIMEOUT = 5000,

      // BLOCKCHAIN

      /** Default for -blockmaxweight, which controls the range of block weights the mining code will create **/
      DEFAULT_BLOCK_MAX_WEIGHT = MAX_BLOCK_WEIGHT - 4000,

      /** Default for -blockmintxfee, which sets the minimum feerate for a transaction in blocks created by mining code **/
      DEFAULT_BLOCK_MIN_TX_FEE = 1000,

      /** The maximum weight for transactions we're willing to relay/mine */
      MAX_STANDARD_TX_WEIGHT = 400000,

      /** The minimum non-witness size for transactions we're willing to relay/mine (1 segwit input + 1 P2WPKH output = 82 bytes) */
      MIN_STANDARD_TX_NONWITNESS_SIZE = 82,

      /** Maximum number of signature check operations in an IsStandard() P2SH script */
      MAX_P2SH_SIGOPS = 15,

      /** The maximum number of sigops we're willing to relay/mine in a single tx */
      MAX_STANDARD_TX_SIGOPS_COST = MAX_BLOCK_SIGOPS_COST / 5,

      /** Default for -maxmempool, maximum megabytes of mempool memory usage */
      DEFAULT_MAX_MEMPOOL_SIZE = 300,

      /** Default for -incrementalrelayfee, which sets the minimum feerate increase for mempool limiting or BIP 125 replacement **/
      DEFAULT_INCREMENTAL_RELAY_FEE = 1000,

      /** Default for -bytespersigop */
      DEFAULT_BYTES_PER_SIGOP = 20,

      /** Default for -permitbaremultisig */
      DEFAULT_PERMIT_BAREMULTISIG = true,

      /** The maximum number of witness stack items in a standard P2WSH script */
      MAX_STANDARD_P2WSH_STACK_ITEMS = 100,

      /** The maximum size in bytes of each witness stack item in a standard P2WSH script */
      MAX_STANDARD_P2WSH_STACK_ITEM_SIZE = 80,

      /** The maximum size in bytes of each witness stack item in a standard BIP 342 script (Taproot, leaf version 0xc0) */
      MAX_STANDARD_TAPSCRIPT_STACK_ITEM_SIZE = 80,

      /** The maximum size in bytes of a standard witnessScript */
      MAX_STANDARD_P2WSH_SCRIPT_SIZE = 3600,

      /** The maximum size of a standard ScriptSig */
      MAX_STANDARD_SCRIPTSIG_SIZE = 1650,

      /** Min feerate for defining dust. Historically this has been based on the
       * minRelayTxFee, however changing the dust limit changes which transactions are
       * standard and should be done with care and ideally rarely. It makes sense to
       * only increase the dust limit after prior releases were already not creating
       * outputs below the new threshold */
      DUST_RELAY_TX_FEE = 3000,

      // OP-CODES

      // Maximum number of bytes pushable to the stack
      MAX_SCRIPT_ELEMENT_SIZE = 520,

      // Maximum number of non-push operations per script
      MAX_OPS_PER_SCRIPT = 201,

      // Maximum number of public keys per multisig
      MAX_PUBKEYS_PER_MULTISIG = 20,

      /** The limit of keys in OP_CHECKSIGADD-based scripts. It is due to the stack limit in BIP342. */
      MAX_PUBKEYS_PER_MULTI_A = 999,

      // Maximum script length in bytes
      MAX_SCRIPT_SIZE = 10000,

      // Maximum number of values on script interpreter stack
      MAX_STACK_SIZE = 1000,

      // Threshold for nLockTime: below this value it is interpreted as block number,
      // otherwise as UNIX timestamp.
      LOCKTIME_THRESHOLD = 500000000, // Tue Nov  5 00:53:20 1985 UTC

      // Maximum nLockTime. Since a lock time indicates the last invalid timestamp, a
      // transaction with this lock time will never be valid unless lock time
      // checking is disabled (by setting all input sequence numbers to
      // SEQUENCE_FINAL).
      LOCKTIME_MAX = 0xffffffff,

      // Tag for input annex. If there are at least two witness elements for a transaction input,
      // and the first byte of the last element is 0x50, this last element is called annex, and
      // has meanings independent of the script
      ANNEX_TAG = 0x50,
    } = {},
  } = {},
} = config;

// Validating

if (require('net').isIP(connect) === false) {
  throw new Error('Not a IP address.');
}

//

const policy = {
  outer: {
    MAX_BLOCK_SERIALIZED_SIZE,
    MAX_BLOCK_WEIGHT,
    MAX_BLOCK_SIGOPS_COST,
    COINBASE_MATURITY,
    WITNESS_SCALE_FACTOR,
    MIN_TRANSACTION_WEIGHT,
    MIN_SERIALIZABLE_TRANSACTION_WEIGHT,
  },
  inner: {
    // NET-BASE
    DEFAULT_CONNECT_TIMEOUT,
    // BLOCKCHAIN
    DEFAULT_BLOCK_MAX_WEIGHT,
    DEFAULT_BLOCK_MIN_TX_FEE,
    MAX_STANDARD_TX_WEIGHT,
    MIN_STANDARD_TX_NONWITNESS_SIZE,
    MAX_P2SH_SIGOPS,
    MAX_STANDARD_TX_SIGOPS_COST,
    DEFAULT_MAX_MEMPOOL_SIZE,
    DEFAULT_INCREMENTAL_RELAY_FEE,
    DEFAULT_BYTES_PER_SIGOP,
    DEFAULT_PERMIT_BAREMULTISIG,
    MAX_STANDARD_P2WSH_STACK_ITEMS,
    MAX_STANDARD_P2WSH_STACK_ITEM_SIZE,
    MAX_STANDARD_TAPSCRIPT_STACK_ITEM_SIZE,
    MAX_STANDARD_P2WSH_SCRIPT_SIZE,
    MAX_STANDARD_SCRIPTSIG_SIZE,
    DUST_RELAY_TX_FEE,
    // OP-CODES
    MAX_SCRIPT_ELEMENT_SIZE,
    MAX_OPS_PER_SCRIPT,
    MAX_PUBKEYS_PER_MULTISIG,
    MAX_PUBKEYS_PER_MULTI_A,
    MAX_SCRIPT_SIZE,
    MAX_STACK_SIZE,
    LOCKTIME_THRESHOLD,
    LOCKTIME_MAX,
    ANNEX_TAG,
  },
};

// policy.version = sha256([outerVersion, innerVersion]).toString()
policy.version = toVersion([
  attachVersionToObject(policy.outer),
  attachVersionToObject(policy.inner),
]);

module.exports = {
  connect,
  port,
  policy,
};
