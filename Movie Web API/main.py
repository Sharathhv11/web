import requests as req

#? API url 
url = "http://localhost:8080/api/v1/movies"

#! data for sample post requests
data = {
    "name":"patch".capitalize(),
    "releasedYear":1999,
    "duriation" : 149,
    "cerificate" : "UA",
    "rating" : {
        "imdb" : 9,
        "rotten tomatoes" : 8
        }
}

patchData = {
    "duriation":159
}
getMoviesResponse = req.get(url)
postResponse = req.post(url,json=data)

getMovieResponse = req.get(url+"/1000")

deleteMovieResponse = req.delete(url+"/1014")

patchResponse = req.patch(url+"/1008",json=patchData)


