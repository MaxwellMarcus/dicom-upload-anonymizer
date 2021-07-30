export const log = (...content) => {
  console.log(...content)
}

export const script = `
    version "6.3"
    alterPixels["rectangle", "l=100, t=100, r=200, b=200", "solid", "v=100"]
    (0008,0080) := "Washington University School of Medicine"
    (0008,0018) := hashUID[(0008,0018)]
    // Add 14 days to Study Date
    (0008,0020) := shiftDateByIncrement[ (0008,0020), "14"]
    - (0008,0021)
    `
