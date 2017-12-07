module InferredTypes exposing (main)

import Html exposing (text)


main =
    add 1 3.2
        |> toString
        |> text


add a b =
    a + b
