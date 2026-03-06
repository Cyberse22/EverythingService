static int JosephusSimulate(int n, int k)
{
    List<int> people = new List<int>();
    for (int i = 1; i <= n; i++)
        people.Add(i);

    int index = 0;

    while (people.Count > 1)
    {
        index = (index + k - 1) % people.Count;
        people.RemoveAt(index);
    }
    return people[0];
}

// Do not use Dijkstra if there is a negative edge
// Complexity O((V + E) log V)
static int[] Dijkstra(int n, List<(int to, int weight)>[] graph, int src)
{
    int[] dist = new int[n];
    Array.Fill(dist, int.MaxValue);
    dist[src] = 0;

    var pq = new PriorityQueue<int, int>();
    pq.Enqueue(src, 0);

    while(pq.Count > 0)
    {
        pq.TryDequeue(out int u, out int d);
        if (d > dist[u]) continue;
        
        foreach(var (v, w) in graph[u])
        {
            if (dist[v] > dist[u] + w)
            {
                dist[v] = dist[u] + w;
                pq.Enqueue(v, dist[v]);
            }
        }    
    }
    return dist;
}

int n = 5;
var graph = new List<(int to, int weight)>[n];
for (int i = 0; i < n; i++)
    graph[i] = new List<(int, int)>();

graph[0].Add((1, 6));
graph[0].Add((2, 7));
graph[1].Add((2, 8));
graph[1].Add((3, 5));
graph[1].Add((4, -4));
graph[2].Add((3, -3));
graph[2].Add((4, 9));
graph[3].Add((1, -2));
graph[4].Add((0, 2));
graph[4].Add((3, 7));

var d1 = Dijkstra(n, graph, 0);
Console.WriteLine(string.Join(", ", d1));

// Can use BellmanFord with a negative edge
// O(V * E)
static bool BellmanFord(int n, List<(int from, int to, int weight)> edges, int src, out int[] dist)
{
    dist = new int[n];
    Array.Fill(dist, int.MaxValue);
    dist[src] = 0;

    for (int i = 0; i < n - 1; i++)
    {
        foreach (var (u, v, w) in edges)
        {
            if (dist[u] != int.MaxValue && dist[v] > dist[u] + w)
            {
                dist[v] = dist[u] + w;
            }
        }
    }

    foreach (var (u, v, w) in edges)
    {
        if (dist[u] != int.MaxValue && dist[v] > dist[u] + w)
        {
            return false;
        }
    }
    return true;
}

var edges = new List<(int from, int to, int weight)>
{
    (0,1,6),(0,2,7),
    (1,2,8),(1,3,5),(1,4,-4),
    (2,3,-3),(2,4,9),
    (3,1,-2),
    (4,0,2),(4,3,7)
};

bool ok = BellmanFord(n, edges, 0, out int[] d2);

Console.WriteLine(ok
    ? string.Join(", ", d2)
    : "Negative cycle detected");

// Not good for big graph
// O(V^3)
static int[,] FloydWarshall(int n, int[,] graph)
{
    int[,] dist = (int[,])graph.Clone();
    const int INF = 1_000_000_000;

    for (int k = 0; k < n; k++)
        for (int i = 0; i < n; i++)
            for (int j = 0; j < n; j++)
                if (dist[i, k] < INF && dist[k, j] < INF)
                    dist[i, j] = Math.Min(dist[i, j], dist[i, k] + dist[k, j]);
    return dist;
}
const int INF = 1_000_000_000;
int[,] matrix =
{
    {0,   6,   7,   INF, INF},
    {INF, 0,   8,   5,   -4},
    {INF, INF, 0,   -3,  9},
    {INF, -2,  INF, 0,   INF},
    {2,   INF, INF, 7,   0}
};

var d3 = FloydWarshall(n, matrix);

for (int i = 0; i < n; i++)
{
    for (int j = 0; j < n; j++)
        Console.Write((d3[i, j] >= INF ? "INF" : d3[i, j]) + "\t");
    Console.WriteLine();
}