<aside className="space-y-6">
  <Card className="p-2">
    <CardContent>
      <div className="py-2">
        <h3 className="font-semibold text-xl">Bài nổi bật</h3>
      </div>
      <ScrollArea className="h-full mt-3">
        <div className="space-y-3">
          {sampleArticles.slice(0, 4).map((a) => (
            <div key={a.id} className="flex items-start gap-3 border-[1px]">
              <img
                src={a.image}
                alt={a.title}
                className="w-[100px] h-[100px] object-cover"
              />
              <div className="p-2">
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-slate-500">
                  {formatDate(a.date, "dd/MM/yyyy")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </CardContent>
  </Card>
</aside>;
