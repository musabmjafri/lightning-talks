export interface slackEvent {

    token: string,
    team_id?: string,
    api_app_id?: string,
    challenge?: string,
    event: slackEventDetail,
    type: string,
    authed_users?: string[],
    authed_teams?: string[],
    event_id?: string,
    event_time?: number
}

export interface slackEventDetail {

    type?: string,
    channel?: string,
    user?: string,
    text?: string,
    ts?: string,
    team?: string,
    inviter?: string,
    message_ts?: string,
    thread_ts?: string,
    event_ts?: string,
    links?: slackEventDetailLink[],
    channel_type?: string,
    item?: string
}

export interface slackEventDetailLink {

    domain: string,
    url: string
}