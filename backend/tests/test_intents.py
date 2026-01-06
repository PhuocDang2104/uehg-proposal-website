from app.graph.intents import Intent, route_intent


def test_route_upcoming_show():
    assert route_intent("Show sap toi khi nao?") == Intent.UPCOMING_SHOW


def test_route_past_show():
    assert route_intent("Show da qua gan day?") == Intent.PAST_SHOW


def test_route_members():
    assert route_intent("Thanh vien noi bat cua CLB?") == Intent.MEMBERS


def test_route_out_of_scope():
    assert route_intent("Ngay mai thoi tiet the nao?") == Intent.OUT_OF_SCOPE
