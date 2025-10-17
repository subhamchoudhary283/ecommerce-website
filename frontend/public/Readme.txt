useEffect(() => {
  // Ye code tab chalega jab component render hoga
  // Ya dependencies change hongi
  return () => {
    // Cleanup code (optional) — jaise event listener remove karna
  }
}, [dependencies]);

Parameters
Callback function – Isme tum woh code likhte ho jo run karna hai.

Dependency array – Ye decide karta hai kab useEffect chale:

[] (empty array) → sirf 1st render pe chalega (component mount hote time).

[stateVariable] → jab wo specific variable change hoga tab chalega.

Agar dependency array hi na do → har render ke baad chalega.

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~