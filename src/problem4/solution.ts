
/**
 * 
 * Time complexity: O(N) - As we loop from 1 to n, so space complexity will be O(N)
 * Space complexity: O(1) - As we only use 1 single variable for storing the result **res**
 * so space complexity will be constant O(1)
 * 
 * Efficiency: Easy to understand but not optimal
 */
function sum_to_n_a(n: number): number {
    let res = 0;

    for (let i = 1; i <= n; i++) {
        res += i;
    }

    return res;
}

/**
 * 
 * Time complexity: O(1) - As we using mathematic formula to calculate the sum, time complexity is constant O(1)
 * Space complexity: O(1) - As we do not initialize any variable, space complexity will be O(1)
 * 
 * Efficiency: Optimal Solution
 */

function sum_to_n_b(n: number): number {
    return (n * (n + 1)) / 2
}

/**
 * 
 * Time complexity: O(N) - As we use recusive, which behaves like a loop that call the stack inversely, time complexity will be linear O(N)
 * Space complexity: O(N) - As we are doing recursively, we are storing callstacks n times hence space complexity will be O(N)
 * 
 * Efficiency: Less efficient solution
 */
function sum_to_n_c(n: number): number {
    if (n <= 1) return n;
    return n + sum_to_n_c(n - 1);
}