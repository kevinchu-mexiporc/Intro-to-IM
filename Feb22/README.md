# Data Visualizatiion

https://user-images.githubusercontent.com/98512579/154992750-f75ea0c7-1acf-45a0-9d7c-52415382eea5.mov

## Description and Concept:

The data visualization work is based on a CSV file rcording every earchquakes happening in Greece since 1930s from Kaggle. There are alos a lot of earthquakes in my home countries, and I always think it will be interesting to visualize the earthquake data. The another reason of doing this is becaues I plan to go to Greece for a trip during the spring break and I want to know where are most earthquakes happen in Greece. I catch 4 different fields of data from the CSV file including langtitude, longtitude, depth, and magnitude of each earthquake. The positions of data points I put on the canvas is based on the langtitude and longtitude after scaling them according to the canvas size. I visualize the depth in colors of black, gray, and white in terms of how deep did the earthquake happen, the lighter the color the deeper it happened. Lastly, I visualize the magnitude of each earthquake in the sense of the radius of each data points, the stronger the earthquake was the bigger the data point is.

## Problems and Solutions:

In the beginning of programming, my CSV file was around 9 MB with 251264 lines of data, so I cannot upload the file. I cut the header and the past data which is not so reliable and not so related to my Greece trip in 2022, and the CSV file only has 125631 lines left, which is half of the original file, and makes it only around 4.7 MB. When I was trying to visualize the data into the scale of the canvas, all the data points are very concentrated. So, I adjusted the parameters that controls the max and min langtitude and longitude and it worked! Later on it was the problem of how to make the color lighter when the earthquake is actually deeper which is laeger numbers in the data. I wrote down the relation between the color and depth into an equation and realized how should I make the parameter in the code.
