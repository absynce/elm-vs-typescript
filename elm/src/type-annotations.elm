module InferredTypes exposing (main)

import Html exposing (text)


main =
    -- This will error at compile-time.
    add 1 3.2
        |> toString
        |> text


add : Int -> Int -> Int
add a b =
    a + b
