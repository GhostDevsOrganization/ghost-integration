# Smart Contract Protocol Testing Plan - Prioritized for the "Portal Concept"

## Goal

Build a comprehensive testing roadmap and test-suite for foundational protocols essential to establishing a Kaspa ecosystem connected via a "portal" (cross-chain bridge), with a focus on core utility like asset swapping and yield generation through "portal vaults."

## Prioritized Protocol Concepts

1.  **Cross-chain Bridge:** The core "Portal" mechanism for bringing external assets onto Kaspa.
2.  **Token Swapping (DEX):** Enables trading and liquidity for assets arriving via the portal.
3.  **Lending & Staking Vaults:** Provides utility for assets by enabling yield generation through lending and staking (the "Portal Vaults" concept).
4.  **Oracle Network:** Provides essential external data feeds (like prices) required by financial protocols.
5.  **Multi-signature Wallet:** Provides secure asset management capabilities for protocol treasuries, multi-user accounts, etc.
6.  **Yield Optimization Vaults:** Builds upon basic lending/staking to automate strategies for maximizing returns (an advanced form of "Portal Vaults").

## Roadmap Phases

### 🔹 PHASE 1: Inventory & Contract Mapping (Focused on Prioritized Concepts)

#### Protocol Concept List & Metadata

| Protocol Concept         | Core Contract Types                                     | Relevant Open-Source References                                  | Language/Standards                                  | Key Dependencies        |
| :----------------------- | :------------------------------------------------------ | :--------------------------------------------------------------- | :-------------------------------------------------- | :---------------------- |
| Cross-chain Bridge       | Bridge contracts (Lock/Mint, Burn/Release), Relayers    | Generic bridge templates (e.g., ERC20 bridges), IBC (Cosmos)     | Likely Rust (WASM), KRC20 standard                  | KRC20 standard, External chain interaction |
| Token Swapping (DEX)     | Router, Factory, Pool contracts                         | Uniswap V2/V3 (Solidity), Curve (Vyper/Solidity)                 | Likely Rust (WASM), KRC20 standard                  | KRC20 standard, Math libraries |
| Lending & Staking Vaults | Lending Pool, Staking Pool, Vault contracts, Reward Distributor | Aave (Solidity), Compound (Solidity), Yearn (Solidity)           | Likely Rust (WASM), KRC20 standard                  | KRC20 standard, Oracle (for lending) |
| Oracle Network           | Oracle consumer interfaces, Data Feed contracts         | Chainlink (Solidity), Band Protocol (Solidity)                   | Likely Rust (WASM), Specific data structures        | External data sources   |
| Multi-signature Wallet   | Multisig Wallet contract                                | Gnosis Safe (Solidity)                                           | Likely Rust (WASM)                                  | -                       |
| Yield Optimization Vaults| Strategy contracts, Vault contracts                     | Yearn (Solidity), Convex (Solidity)                              | Likely Rust (WASM), KRC20 standard                  | Lending/Staking Vaults, DEX, Oracle |

#### Function Breakdown

**Cross-chain Bridge:**
-   `deposit(asset, amount, destination_address, destination_chain)`: Lock assets on source chain, signal relay.
-   `withdraw(asset, amount, destination_address, source_chain, proof)`: Verify proof, release/mint assets on destination chain.
-   `claim_fees()`: Protocol fee distribution.
-   `lock_asset(asset, amount)`: Internal function for locking.
-   `mint_asset(asset, amount, recipient)`: Internal function for minting.

**Token Swapping (DEX):**
-   `swap_exact_tokens_for_tokens(amount_in, amount_out_min, path, to, deadline)`: Swap a fixed input amount.
-   `swap_tokens_for_exact_tokens(amount_out, amount_in_max, path, to, deadline)`: Swap for a fixed output amount.
-   `add_liquidity(token_a, token_b, amount_a_desired, amount_b_desired, amount_a_min, amount_b_min, to, deadline)`: Add liquidity to a pool.
-   `remove_liquidity(token_a, token_b, liquidity, amount_a_min, amount_b_min, to, deadline)`: Remove liquidity from a pool.
-   `get_amounts_out(amount_in, path)`: Fetch estimated output amount for a swap.
-   `get_reserves()`: Fetch current reserves in a pool.

**Lending & Staking Vaults:**
-   `supply(asset, amount)`: Deposit assets into a lending pool/vault.
-   `withdraw(asset, amount)`: Withdraw assets from a lending pool/vault.
-   `borrow(asset, amount)`: Borrow assets against collateral.
-   `repay(asset, amount)`: Repay borrowed assets.
-   `liquidate(borrower, asset_to_liquidate, asset_to_repay)`: Liquidate a position.
-   `claim_interest/rewards()`: Claim earned yield/rewards.
-   `stake(asset, amount)`: Stake assets for rewards/governance.
-   `unstake(asset, amount)`: Unstake assets.

**Oracles:**
-   `get_price(asset_pair)`: Fetch the price of an asset pair.
-   `get_value(data_feed_id)`: Fetch a generic data feed value.

**Multi-signature Wallet:**
-   `submit_transaction(to, value, data)`: Propose a transaction.
-   `confirm_transaction(transaction_id)`: Confirm a proposed transaction.
-   `execute_transaction(transaction_id)`: Execute a confirmed transaction.
-   `add_owner(owner)`: Add a new owner.
-   `remove_owner(owner)`: Remove an owner.
-   `change_threshold(threshold)`: Change the required confirmation threshold.

**Yield Optimization Vaults:**
-   `deposit(asset, amount)`: Deposit assets into the optimization vault.
-   `withdraw(asset, amount)`: Withdraw assets from the vault.
-   `claim_rewards()`: Claim rewards generated by the vault strategy.
-   `rebalance()`: Trigger strategy rebalancing (often internal or permissioned).
-   `get_current_strategy()`: View the active strategy.

#### Difficulty Rating & Priority

| Protocol Concept         | Complexity (1-5) | Priority | Notes                                                                 |
| :----------------------- | :--------------- | :------- | :-------------------------------------------------------------------- |
| Oracle Network           | 2                | High     | Foundational dependency for lending/vaults.                           |
| Multi-signature Wallet   | 3                | Medium   | Useful utility, less critical path than DEX/Vaults initially.         |
| Token Swapping (DEX)     | 4                | High     | Core primitive for asset utility.                                     |
| Lending & Staking Vaults | 4                | High     | Core utility for yield generation ("Portal Vaults"). Depends on Oracle. |
| Yield Optimization Vaults| 5                | Medium   | Layered complexity, depends on Lending/Staking and DEX.               |
| Cross-chain Bridge       | 5                | Highest  | Core "Portal" mechanism, highest complexity due to cross-chain coordination. |

#### Logical Order (for Testing)

1.  **Oracle Network:** Test data fetching interfaces and reliability.
2.  **Multi-signature Wallet:** Test basic transaction submission, confirmation, and execution.
3.  **Token Swapping (DEX):** Test core swap and liquidity functions.
4.  **Lending & Staking Vaults:** Test supply, withdraw, borrow, repay, and liquidation flows. Requires Oracle dependency.
5.  **Yield Optimization Vaults:** Test deposit, withdraw, and reward claiming, ensuring interaction with underlying protocols works. Depends on Lending/Staking and DEX.
6.  **Cross-chain Bridge:** Test lock/mint and burn/release flows, including relaying and proof verification. Highest complexity, often tested last or in parallel with mocks.

This completes Phase 1: Inventory & Contract Mapping.

## 🔹 PHASE 2: Test Case Documentation (Focused on Prioritized Concepts & Functions)

*(To be populated in the next step)*

## 🔹 PHASE 3: CI/CD Integration (Applying to Prioritized Protocol Tests)

*(To be populated in a later step)*

## 🔹 PHASE 4: Execution & Handoff

*(To be populated in a later step)*
